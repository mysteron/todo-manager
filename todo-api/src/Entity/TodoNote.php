<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TodoNoteRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\PrePersist;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TodoNoteRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
    forceEager: false
)]
#[HasLifecycleCallbacks] 
class TodoNote
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read"])]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'todoNotes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["read", "write"])]
    private $owner;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'todoNotes')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(["read", "write"])]
    private $category;

    #[ORM\Column(type: 'datetimetz', options: ["default" => "CURRENT_TIMESTAMP"])]
    #[Groups(["read"])]
    private $created;

    #[ORM\Column(type: 'datetimetz', options: ["default" => "CURRENT_TIMESTAMP"])]
    #[Groups(["read"])]
    private $updated;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read", "write"])]
    private $title;

    #[ORM\Column(type: 'string', length: 1024)]
    #[Groups(["read", "write"])]
    private $description;

    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(["read", "write"])]
    private $completed;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getUpdated(): ?\DateTimeInterface
    {
        return $this->updated;
    }

    public function setUpdated(\DateTimeInterface $updated): self
    {
        $this->updated = $updated;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

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
    #[PrePersist]
    function onPrePersist()
    {        
        $this->created = new \DateTime('now');
        $this->updated = new \DateTime('now');
    }

    public function getCompleted(): ?bool
    {
        return $this->completed;
    }

    public function setCompleted(?bool $completed): self
    {
        $this->completed = $completed;

        return $this;
    }
}
