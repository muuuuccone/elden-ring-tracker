import {Card, CardContent, CardMedia} from "@mui/material";
import sanitizeURL from "@/utils/functions/sanitizeURL";
import Image from "next/image";


export default function ItemsCard({name, type, hint, multiple, id}: Item) {
    return (
        <Card>
            <CardMedia>
                <Image src={`/items/${name}.webp`} alt={name} width={100} height={100}/>
            </CardMedia>
            <CardContent>
                {name}
            </CardContent>
        </Card>
    );
}
