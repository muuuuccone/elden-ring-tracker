import {Box, Card, CardContent, Container, Grid, Stack} from "@mui/material";
import {getArmorSets} from "@/utils/functions/getArmorSets";
import Typography from "@mui/material/Typography";
import styles from './page.module.css';
import ArmorPiece from "@/components/armor_piece";

interface SectionProps {
    set: ArmorSet
}

function SetSection(props: SectionProps) {
    const {set} = props;
    return (
        <Box className={styles.setSection}>
            <Card elevation={4}>
                <Typography className={styles.title} variant={'h6'}>
                    <a href={set.link} className={styles.link} target={'_blank'}>{set.name}</a>
                </Typography>
            </Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={2} sx={{display: {xs:'none', lg:'block'}}}>
                        <img className={styles.setImage} src={set.image} alt={set.name}/>
                    </Grid>
                    {
                        set.items.map((item: string) => {
                            return (
                                <ArmorPiece key={item} item={item}/>
                            )
                        })
                    }
                </Grid>
            </CardContent>
        </Box>
    )
}

export default function ArmorPage() {
    return (
        <Container>
            <Stack spacing={5}>
                {
                    getArmorSets().map((set: ArmorSet, index) =>
                        <SetSection key={index} set={set}/>
                    )
                }
            </Stack>
        </Container>
    )
}