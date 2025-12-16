import { 
  AfterInsert, 
  AfterUpdate, 
  AfterRemove, 
  BeforeInsert, 
  BeforeUpdate,
  Column, 
  Entity, 
  ObjectId, 
  ObjectIdColumn 
} from 'typeorm';

@Entity()
export class Employee {
  @ObjectIdColumn()
  id: ObjectId;
  
  @Column()
  fullnom: string;
  
  @Column()
  Rank: number;
  
  @Column()
  Salary: number;

  @BeforeInsert()
  @BeforeUpdate()
  trimFullnom() {
    if (this.fullnom) {
      this.fullnom = this.fullnom.trim();
    }
  }

  @AfterInsert()
  logInsert() {
    console.log('Employé inséré avec id:', this.id);
  }
  
  @AfterUpdate()
  logUpdate() {
    console.log(' Employé mis à jour:', this.id);
  }
  
  @AfterRemove()
  logRemove() {
    console.log(' Employé supprimé:', this.id);
  }
}