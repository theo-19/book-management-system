// frontend/src/app/page.tsx
import { Card, CardContent, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { bookSchema } from "shared/schemas";

export default async function HomePage() {
  const res = await fetch("http://localhost:3001/books", { cache: "no-store" });
  const { data } = await res.json();

  return (
    <Container suppressHydrationWarning sx={{ py: 4 }} maxWidth="lg">
      <Grid container spacing={4}>
        {data.map((book: typeof bookSchema._type) => (
          <Grid key={book.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {book.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {book.author}
                </Typography>
                <Typography>
                  {book.description.length > 100
                    ? `${book.description.slice(0, 100)}…`
                    : book.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
