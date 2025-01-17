import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuario_medico' })
export class ColaboradorMedicoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;
  @Column({ name: 'cpf', length: 20, nullable: false })
  cpf: string;
  @Column({ name: 'crm', length: 20, nullable: false })
  crm: string;
  @Column({ name: 'celular', length: 25 })
  celular: string;
  @Column({ name: 'email', length: 50, nullable: false })
  email: string;
  @Column({ name: 'data_nascimento', nullable: false })
  dataDeNascimento: Date;
  @Column({ name: 'imagem', length: 150 })
  imagem: string;

  //Auditar entidade
  @CreateDateColumn({ name: 'created_at' })
  createAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: string;
  @DeleteDateColumn({ name: 'delete_at' })
  deleteAt: string;
}
