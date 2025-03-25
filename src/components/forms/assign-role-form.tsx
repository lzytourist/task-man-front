import {useForm} from "react-hook-form";
import {AssignRoleType, Role, UserType} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {AssignRoleSchema} from "@/lib/schemas";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect} from "react";
import {assignRole} from "@/actions/users";
import {toast} from "sonner";

export default function AssignRoleForm({roles, user}: { roles: Role[], user: UserType }) {
  const form = useForm<AssignRoleType>({
    resolver: zodResolver(AssignRoleSchema),
    defaultValues: {
      role: null
    }
  });

  useEffect(() => {
    if (user.role) {
      form.setValue('role', user.role.toString());
    }
  }, [user, form]);

  const handleChange = async (role: string) => {
    form.setValue('role', role);
    const response = await assignRole(role, user.id.toString());
      if (response.error) {
        toast.error('Could not update user role');
        form.reset();
        form.setValue('role', user.role.toString());
      } else {
        toast.success('User role updated');
      }
  }

  return (

    <Select defaultValue={form.getValues('role')!} onValueChange={handleChange}>
      <SelectTrigger className={'w-40'}>
        <SelectValue placeholder={'Select role'}/>
      </SelectTrigger>
      <SelectContent>
        {roles.map((role, index) => (
          <SelectItem key={index} value={role.id ?? ''}>{role.title}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}