import { SchemaRegister } from '@/lib/validator/register';
import { createClient } from '@/utils/supabase/server';


export async function POST(req: Request) {
    
    try {
        // Validate input
        let body = await req.json();

        const validateData = SchemaRegister.parse(body);

        let supabase = createClient();

        
        let { data: User } = await supabase
            .from('User')
            .select('*').eq('email',validateData.email)
        
        // Check if user already exists

        if (User?.length) {
            throw new Error("User already exists");
        }

        // we register 
        const {  data } = await supabase.auth.signUp({
            email: validateData.email,
            password: validateData.password
            })
        
            console.log(data)
      
        // insert row in the user 
        const {  error }=  await supabase
        .from('User')
        .insert([
         {email:validateData,id:data.user?.id,username:validateData.name} 
        ])
        .select()

        if (error){
            console.error(error)
            return new Response(error.message, { status: 400 })
        }
        
        
        return new Response('Registration sucessfull', { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 })

        }
    }

  
}
