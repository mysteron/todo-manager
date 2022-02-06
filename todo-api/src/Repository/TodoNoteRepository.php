<?php

namespace App\Repository;

use App\Entity\TodoNote;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TodoNote|null find($id, $lockMode = null, $lockVersion = null)
 * @method TodoNote|null findOneBy(array $criteria, array $orderBy = null)
 * @method TodoNote[]    findAll()
 * @method TodoNote[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TodoNoteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TodoNote::class);
    }

    // /**
    //  * @return TodoNote[] Returns an array of TodoNote objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TodoNote
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
