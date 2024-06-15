import itemsWithImages from '../../data/items_with_image.json';
import {sanitizeName} from "./sanitizeName";

export default function getWikiImage(name){
    const item = itemsWithImages.find(item => item.name === name);
    return item ? item.image : "";
}