<?php
// src/Controller/HelloWorldController.php
namespace App\Controller;

use App\Entity\TodoNote;
use App\Repository\CategoryRepository;
use App\Repository\TodoNoteRepository;
use Doctrine\ORM\EntityManagerInterface;

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

  private function getCategories(String $field = 'id', String $order = 'ASC')
  {
    return $this->catRepo->findBy(
      array(),
      array($field => $order)
    );
  }

  private function getTodos(String $field = 'id', String $order = 'ASC')
  {
    return $this->noteRepo->findBy(
      array(),
      array($field => $order)
    );
  }

  #[Route('/')]
  public function base(): Response
  {
    return $this->redirect('/todo-list');
  }

  #[Route('/todo-list', methods: ['GET'])]
  public function todoList(): Response
  {
    return $this->render('todos.html.twig', [
      'currentRoute' => 'todo-list',
      'todos' => $this->getTodos(),
      'categories' => $this->getCategories()
    ]);
  }

  #[Route('/todo-list', methods: ['POST'])]
  public function todoListSave(Request $request): Response
  {
    $task = new TodoNote();
    $form = $this->createForm(TaskType::class, $task);
    $form->handleRequest($request);
    if ($form->isSubmitted() && $form->isValid()) {
      $task = $form->getData();
    }
    return $this->render('todos.html.twig', [
      'currentRoute' => 'todo-list',
      'todos' => $this->getTodos(),
      'categories' => $this->getCategories()
    ]);
  }

  #[Route('/todo-list/{id}')]
  public function todoEditOnList(int $id): Response
  {
    return $this->render('todos.html.twig', [
      'currentRoute' => 'todo-list',
      'todos' => $this->getTodos(),
      'categories' => $this->getCategories(),
      'toEdit' => $id
    ]);
  }

  #[Route('/categories')]
  public function categories(): Response
  {
    return $this->render('category-list.html.twig', [
      'currentRoute' => 'categories',
      'categories' => $this->getCategories(),
      'isEditing' => False
    ]);
  }
}
