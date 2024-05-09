import prisma from '@/lib/db';
import { SchemaRegister } from '@/lib/validator/register';
import { createClient } from '@/utils/supabase/server';


export async function POST(req: Request) {
    
    try {
        // Validate input
        let datad = await req.json();

        const validatedData = SchemaRegister.parse(datad);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email: validatedData.email } });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const supabase = createClient()

        const { data, error } = await supabase.auth.signUp({
            email: validatedData.email,
            password: validatedData.password
            })

        if (error){
            console.error(error)
            return new Response(error.message, { status: 400 })
        }
        // Hash password and create user
        await prisma.user.create({
            data: { email: validatedData.email,  username: validatedData.name,id:data.user?.id , information:{} }
        });
        return new Response('Registration sucessfull', { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 })

        }
    }

  
}
