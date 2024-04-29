interface Data {
    data: {
        footnote: string;
        image: string;
    };
    isActive: boolean;
    onClick: () => void;
}

const FoodChoice = ({ data, isActive, onClick }: Data ) => {
    return (
      <div className={`foodchoice ${isActive ? 'food-active' : ''}`} onClick={onClick} data-cy={data.footnote.split(' ')[0]}>
        <img src={data.image} alt={data.footnote} />
        <p className={`${isActive ? 'food-active' : ''}`}>{data.footnote}</p>
      </div>
    );
};


export default FoodChoice;