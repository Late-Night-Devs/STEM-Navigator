
export function getAllTagCategoryPairingsForAProgram(program, programTags, tags) {
    return programTags
    .filter((programTags) => programTags.program_id === program.program_id)
    .map((programTags) => {
      const tagInfo = tags.find((tag) => programTags.tag_id === tag.tag_id);
      return tagInfo ? { tag_name: tagInfo.tag_name.toString(), category: tagInfo.category } : null; })
    .filter((tag) => tag !== null);
}

const FIRST_ELEMENT  = 0;
const SECOND_ELEMENT = 1;

// 'associatedTags' is an array of objects.
export function getTagsThatHaveACertainCategory(associatedTags, category) {

    // Turn that array of objects into an array of arrays.
    for (let i = 0; i < associatedTags.length; i++) {
        associatedTags[i] = Object.values(associatedTags[i]);
    }

    // Filter 'associatedTags' for the inner arrays that contain the passed 'category' value.
    const filteredAssociatedTags = associatedTags.filter((innerArray) => innerArray[SECOND_ELEMENT] === category);

    // Make a new empty array that will contain all the tags we're looking for.
    const tagsWithTheDesiredCategory = [];

    // Extract the first element from each inner array from 'filteredAssociatedTags'.
    for (let i = 0; i < filteredAssociatedTags.length; i++) {
        tagsWithTheDesiredCategory[i] = filteredAssociatedTags[i][FIRST_ELEMENT];
    }
    
    return tagsWithTheDesiredCategory;
}
