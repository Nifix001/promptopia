import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import mongoose from 'mongoose';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
      await connectToDB();
  
      const { id } = params;
  
      // Validate the ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return new Response("Invalid prompt ID", { status: 400 });
      }
  
      // Check if the prompt exists
      const promptToDelete = await Prompt.findById(id);
      if (!promptToDelete) {
        return new Response("Prompt not found", { status: 404 });
      }
  
      // Delete the prompt using findByIdAndDelete
      await Prompt.findByIdAndDelete(id);
  
      return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Error deleting prompt:", error);  // Log the error for debugging
      return new Response("Error deleting prompt", { status: 500 });
    }
  };