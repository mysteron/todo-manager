<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TodoNoteRepository;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TodoNoteRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
    forceEager: false
)]
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

    #[ORM\Column(type: 'datetimetz')]
    #[Gedmo\Timestampable(on: 'create')]
    #[Groups(["read"])]
    private $created;

    #[ORM\Column(type: 'datetimetz')]
    #[Groups(["read"])]
    private $updated;

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
}
