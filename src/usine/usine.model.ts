import { AfterInsert, AfterUpdate, AfterRemove, BeforeInsert, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Usine {
  
  @AfterInsert()
  logInsert() {
    console.log('✅ Usine insérée avec id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('🔄 Usine mise à jour:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('🗑️ Usine supprimée:', this.id);
  }

  @BeforeInsert()
  addTenToEmployees() {
    this.nbrEmployee = (this.nbrEmployee || 0) + 10;
    console.log(' Hook BeforeInsert: +10 employés ajoutés. Total:', this.nbrEmployee);
  }

  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  nom: string;

  @Column()
  adresse: string;

  @Column()
  nbrEmployee: number;

  @Column()
  statut: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}