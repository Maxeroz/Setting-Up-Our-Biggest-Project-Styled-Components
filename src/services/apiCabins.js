import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
}

export async function deleteCabin(cabin) {
  // 1. Delete cabin row from cabins table
  const { error } = await supabase.from("cabins").delete().eq("id", cabin.id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  // 2. Delete cabin image
  const { error: deleteError } = await supabase.storage
    .from("cabin-images")
    .remove([cabin.image.split("/").pop()]);
  if (deleteError) {
    console.error("We couldnt delete the image from the database");
  }
  // return data;
}
