import {Box, Card, CardContent, Container, Grid, Stack} from "@mui/material";
import {getArmorSets} from "@/utils/functions/getArmorSets";
import Typography from "@mui/material/Typography";
import styles from './page.module.css';
import ArmorPiece from "@/components/armor_piece";

function SetSection ({set}) {
    return(
        <Box className={styles.setSection}>
            <Card elevation={4}>
                <Typography className={styles.title}>{set.name}</Typography>
            </Card>
            <CardContent>
                <Grid container spacing={3}>
                    {
                        set.items.map((item) => {
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
                    getArmorSets().map((set, index) => {
                        return (
                            <SetSection key={index} set={set} />
                        )
                    })
                }
            </Stack>
        </Container>
    )
}