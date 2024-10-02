import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find().populate('creator');
        
        // Log the data being returned

        return new Response(JSON.stringify(prompts), {status: 200});
    } catch(error){
        console.error(error);  // Log the error to diagnose issues
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}
