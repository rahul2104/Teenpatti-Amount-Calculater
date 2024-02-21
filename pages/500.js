import Layout from '../layout/main';

export default function InternalServerError() {
  return (
    <Layout notHeader={true}>
      <div className="wrapper_404">
        <div className="main_404">
          <img src="../images/InternalServerError.png" className="img_404" />
          <img src="../images/500.png" className="img_404 bg-500" />
        </div>
      </div>
    </Layout>
  );
}
