export class BaseCrudService { constructor() {} async find() { return []; } async get(id: string) { return null; } async create(data: any) { return data; } async update(id: string, data: any) { return data; } async delete(id: string) { return true; } } 
 
export const MemberProvider = ({ children }: { children: React.ReactNode }) => children; 
 
export const useMember = () => ({ member: null, isLoggedIn: false });
