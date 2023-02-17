export interface IRole {
  id: number,
  name: string,
  identifier: string,
  description: string,
  created_at: Date,
  updated_at: Date,
  deleted_at?: Date
}