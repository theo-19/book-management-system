import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ScienceIcon from "@mui/icons-material/Science";
import SearchIcon from "@mui/icons-material/Search";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import banner from "../public/images/banner.jpg";
import book1 from "../public/images/book1.jpg";
import book2 from "../public/images/book2.jpg";
import book3 from "../public/images/book3.jpg";
import book4 from "../public/images/book4.jpg";

export const revalidate = 300;

const categories = [
  { label: "Fiction", icon: <BookIcon /> },
  { label: "Science", icon: <ScienceIcon /> },
  { label: "Romance", icon: <FavoriteIcon /> },
  { label: "Business", icon: <BusinessCenterIcon /> },
  { label: "Self‑Help", icon: <SelfImprovementIcon /> },
  { label: "Kids", icon: <ChildCareIcon /> },
];

type Book = { id: string; title: string; author: string };

export default async function HomePage() {
  const res = await fetch("http://localhost:3001/books", {
    next: { revalidate },
  });
  const { data: books } = (await res.json()) as { data: Book[] };

  const covers = [book1, book2, book3, book4];

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            BookStore
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Categories</Button>
          <Button color="inherit">New Releases</Button>
          <Button color="inherit">Best Sellers</Button>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search books..."
            sx={{ ml: 2, width: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton sx={{ ml: 1 }}>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          py: 6,
          px: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Discover Your Next Favorite Book
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                Explore thousands of books from contemporary to classics.
              </Typography>
              <Button variant="contained" size="large">
                Browse Collection
              </Button>
            </Grid>
            <Grid xs={12} md={6}>
              <Box
                component="img"
                src={banner.src}
                alt="Featured Books Banner"
                sx={{
                  width: "100%",
                  height: 300,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          New Releases
        </Typography>
        <Grid container spacing={2}>
          {books.map((book, idx) => (
            <Grid xs={12} sm={6} md={3} key={book.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  src={covers[idx % covers.length].src}
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" size="small">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Browse Categories
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <Paper
              key={cat.label}
              elevation={2}
              sx={{
                textAlign: "center",
                p: 2,
                flex: "1 0 120px",
                cursor: "pointer",
              }}
            >
              <IconButton size="large">{cat.icon}</IconButton>
              <Typography variant="body1">{cat.label}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{ backgroundColor: "#333", color: "#fff", py: 6, mt: 4 }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2">
                Your trusted source for books since 2025.
              </Typography>
            </Grid>
            <Grid xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Customer Service
              </Typography>
              <Typography variant="body2">Contact Us</Typography>
              <Typography variant="body2">Shipping Policy</Typography>
              <Typography variant="body2">Returns & Refunds</Typography>
              <Typography variant="body2">FAQ</Typography>
            </Grid>
            <Grid xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Newsletter
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter your email"
                sx={{ backgroundColor: "#fff", borderRadius: 1, width: "100%" }}
              />
              <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={4}>
            <Typography variant="caption">
              © 2025 BookStore. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
