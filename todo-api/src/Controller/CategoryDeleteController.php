<?php
// src/Controller/CategoryDeleteController.php
namespace App\Controller;

use App\Repository\CategoryRepository;
use App\Repository\TodoNoteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class CategoryDeleteController extends AbstractController
{

  public function __construct(private EntityManagerInterface $em, private CategoryRepository $catRepo, private TodoNoteRepository $noteRepo)
  {
  }
  public function __invoke(string $id)
  {
    if ($id == 1) {
      return $this->json(['error' => "Cannot delete this category"], 400);
    }
    $found = $this->catRepo
      ->find($id);

    if (!$found) {
      throw $this->createNotFoundException(
        'Not found'
      );
    }

    $generalCategory = $this->catRepo->find(1);

    // probably should be done on the DB level, but I wanted to experiment with Controllers a bit
    $todoNotes = $found->getTodoNotes();
    foreach ($todoNotes as $note) {
      $note->setCategory($generalCategory);
      $this->em->persist($note);
    }
    


    $this->em->remove($found);
    $this->em->flush();

    return new Response(null, 204);
  }
}
