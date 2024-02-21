import Layout from '../layout/main';

export default function pageNotFound() {
  return (
    <Layout notHeader={true}>
      <div className="wrapper_404">
        <div className="main_404">
          <img src="../images/Page-Not-Found.png" className="img_404" />
          <img src="../images/404.png" className="img_404" />
        </div>
      </div>
    </Layout>
  );
}
