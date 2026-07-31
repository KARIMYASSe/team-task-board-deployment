import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'users',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Prop({
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true,
  })
  firstName!: string;

  @Prop({
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true,
  })
  lastName!: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Prop({
    type: String,
    required: true,
    select: false, 
  })
  passwordHash!: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role!: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type userDocument = HydratedDocument<User>;
export const userModel = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
