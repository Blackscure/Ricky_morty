import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import AppWidgetSummary from '../app-widget-summary';


// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
   

      <Grid container spacing={4}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Episodes"
            total={51}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Characters"
            total={826}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Locations"
            total={126}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

     
      </Grid>
    </Container>
  );
}
