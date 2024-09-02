import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { UserSettings } from '@/schemas/UserSettings.schema';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: false })
  avatar?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings?: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);
