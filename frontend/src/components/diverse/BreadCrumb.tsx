interface Data {
    page: string;
}

const BreadCrumb = ({ page }: Data ) => {
    return (
      <div className="breadcrumb">
        <h1>{page}</h1>
        <span />
      </div>
    );
};


export default BreadCrumb;