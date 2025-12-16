import { AfterInsert, AfterUpdate, AfterRemove, Column, Entity, ObjectId, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class Product {
  
  @AfterInsert()
  logInsert() {
    console.log('product inserted');
  }

  @AfterUpdate()
  logUpdate() {
    console.log('product updated' + this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('product removed' + this.id);
  }

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  stock: number;

  @Column()
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}