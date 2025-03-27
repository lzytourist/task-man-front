import {useForm} from "react-hook-form";
import {AssignRoleType, Role, UserType} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {AssignRoleSchema} from "@/lib/schemas";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {assignRole} from "@/actions/users";
import {toast} from "sonner";

export default function AssignRoleForm({roles, user}: { roles: Role[], user: UserType }) {
    const form = useForm<AssignRoleType>({
        resolver: zodResolver(AssignRoleSchema),
        defaultValues: {
            role: user.role?.toString()
        }
    });

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
        <Form {...form}>
            <form>
                <FormField render={({field}) => (
                    <FormItem>
                        <Select defaultValue={field.value} onValueChange={handleChange}>
                            <FormControl>
                                <SelectTrigger className={'w-40'}>
                                    <SelectValue placeholder={'Select role'}/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {roles.map((role, index) => (
                                    <SelectItem key={index} value={role.id!.toString()}>{role.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )} name={'role'}/>
            </form>
        </Form>
    )
}