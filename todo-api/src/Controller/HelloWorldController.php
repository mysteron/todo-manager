<?php
// src/Controller/HelloWorldController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HelloWorldController extends AbstractController

{
  #[Route('/hello/world')]
  public function hello_world(): Response
  {
    $number = random_int(0, 100);
    return $this->render('hello_word.html.twig', ['number' => $number]);
  }
}
