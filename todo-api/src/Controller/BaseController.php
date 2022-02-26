<?php
// src/Controller/HelloWorldController.php
namespace App\Controller;

use App\Entity\TodoNote;
use App\Repository\CategoryRepository;
use App\Repository\TodoNoteRepository;
use Doctrine\ORM\EntityManagerInterface;
use PhpParser\Node\Expr\Cast\Array_;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class BaseController extends AbstractController
{

  public function __construct(private EntityManagerInterface $em, private CategoryRepository $catRepo, private TodoNoteRepository $noteRepo)
  {
  }
  public string $currentRouteName = '';

  #[Route('/')]
  public function base(): Response
  {
    return $this->render('base.html.twig');
  }

  #[Route('/todo-list', methods: ['GET'])]
  public function todoList(): Response
  {
    $todos = $this->noteRepo->findBy(
      array(),
      array('id' => 'ASC')
    );
    return $this->render('todos.html.twig', ['currentRoute' => 'todo-list', 'todos' => $todos]);
  }

  #[Route('/todo-list', methods: ['POST'])]
  public function todoListSave(Request $request): Response
  {
    $todos = $this->noteRepo->findBy(
      array(),
      array('id' => 'ASC')
    );
    return $this->render('todos.html.twig', ['currentRoute' => 'todo-list', 'todos' => $todos]);
  }

  #[Route('/todo-list/{id}')]
  public function todoEditOnList(int $id): Response
  {
    $todos = $this->noteRepo->findBy(
      array(),
      array('id' => 'ASC')
    );
    return $this->render('todos.html.twig', ['currentRoute' => 'todo-list', 'todos' => $todos, 'toEdit' => $id]);
  }

  #[Route('/categories')]
  public function categories(): Response
  {
    $categories = $this->catRepo->findBy(
      array(),
      array('id' => 'ASC')
    );
    return $this->render('category-list.html.twig', ['currentRoute' => 'categories', 'categories' => $categories, 'isEditing' => False]);
  }
}
