import { SchemaRegister } from '@/lib/validator/register';
import { createClient } from '@/utils/supabase/server';


export async function POST(req: Request) {
    
    try {
        // Validate input
        let body = await req.json();

        const validateData = SchemaRegister.parse(body);

        console.log(validateData);
        let supabase = createClient();

        
        let { data: User } = await supabase
            .from('User')
            .select('*').eq('email',validateData.email)
        
        // Check if user already exists

        if (User?.length) {
            throw new Error("User already exists");
        }

        // we register 
        const { data, error } = await supabase.auth.signUp({
            email: validateData.email,
            password: validateData.password
            })
        

        if (error){
            console.error(error)
            return new Response(error.message, { status: 400 })
        }
        
        // insert row in the user 
        await supabase
        .from('User')
        .insert([
         {email:validateData,id:data.user?.id,username:validateData.name} 
        ])
        .select()
        
        return new Response('Registration sucessfull', { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 })

        }
    }

  
}
