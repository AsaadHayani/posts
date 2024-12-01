import { Helmet, HelmetProvider } from "react-helmet-async";

const MyHelmet = ({ title }) => (
  <HelmetProvider>
    <Helmet>
      <title>Posts - {title}</title>
    </Helmet>
  </HelmetProvider>
);

export default MyHelmet;
