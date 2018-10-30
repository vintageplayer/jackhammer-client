export const createCustomToolBar = props => {
  return (
    <div class="row" style={{
      marginTop: '15px',
      marginRight: '5px'
    }}>
      <div className='col-xs-6'></div>
      <div className='col-xs-4'></div>
      <div className='col-xs-2 pull-right'>
        {props.components.searchPanel}
      </div>
    </div>
  );
}
