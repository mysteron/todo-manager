<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
    forceEager: false
)]
class User implements UserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(["read", "write"])]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(["read"])]
    private $roles = [];

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Category::class, orphanRemoval: true)]
    #[Groups(["read"])]
    private $categories;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: TodoNote::class, orphanRemoval: true)]
    #[Groups(["read"])]
    private $todoNotes;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->todoNotes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
            $category->setOwner($this);
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        if ($this->categories->removeElement($category)) {
            // set the owning side to null (unless already changed)
            if ($category->getOwner() === $this) {
                $category->setOwner(null);
            }
        }

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
            $todoNote->setOwner($this);
        }

        return $this;
    }

    public function removeTodoNote(TodoNote $todoNote): self
    {
        if ($this->todoNotes->removeElement($todoNote)) {
            // set the owning side to null (unless already changed)
            if ($todoNote->getOwner() === $this) {
                $todoNote->setOwner(null);
            }
        }

        return $this;
    }
}
