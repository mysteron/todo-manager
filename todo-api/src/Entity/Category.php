<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CategoryDeleteController;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
    forceEager: false,
    itemOperations: [
        'patch',
        'get',
        'put',
        'delete' => [
            'method' => "DELETE",
            'controller' => CategoryDeleteController::class,
            'path' => "/categories/{id}",
            'openapi_context' => [
                'parameters' => [
                    // 'name' => "id",
                    // 'in' => "path",
                    // 'description' => "The slug of your superhero",
                    // 'type' => "integer",
                    // 'required' => true,
                    // 'example' => 1,
                ]
            ]
        ]
    ]
)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read", "write"])]
    private $name;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'categories')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["read", "write"])]
    private $owner;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: TodoNote::class)]
    #[Groups(["read"])]
    private $todoNotes;

    #[ORM\Column(type: 'string', length: 1024, nullable: true)]
    #[Groups(["read", "write"])]
    private $description;

    public function __construct()
    {
        $this->todoNotes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection|TodoNote[]
     */
    public function getTodoNotes(): Collection
    {
        return $this->todoNotes;
    }

    public function addTodoNote(TodoNote $todoNote): self
    {
        if (!$this->todoNotes->contains($todoNote)) {
            $this->todoNotes[] = $todoNote;
            $todoNote->setCategory($this);
        }

        return $this;
    }

    public function removeTodoNote(TodoNote $todoNote): self
    {
        if ($this->todoNotes->removeElement($todoNote)) {
            // set the owning side to null (unless already changed)
            if ($todoNote->getCategory() === $this) {
                $todoNote->setCategory(null);
            }
        }

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
