import { Component } from 'react/cjs/react.production.min';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      list: [],
    };
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    window.addEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    this.setState({
      [key]: value,
    });
  }

  addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice(),
    };
    const list = [...this.state.list];
    list.push(newItem);
    this.setState({
      list,
      newItem: '',
    });
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedList = list.filter((item) => item.id !== id);
    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div>
        <h1 className='app-title'>Things to prepare for JS interview</h1>

        <div className='container'>
          <div
            style={{
              padding: 30,
              textAlign: 'left',
              maxWidth: 500,
              margin: 'auto',
            }}
          >
            <div>add an item...</div>
            <br />
            <input
              type='text'
              placeholder='Type item here...'
              value={this.state.newIem}
              onChange={(e) => this.updateInput('newItem', e.target.value)}
            />
            <button
              className='add-btn btn-floating'
              onClick={() => this.addItem()}
            >
              <i className='material-icons'> + </i>
            </button>
            <br />
            <ul>
              {this.state.list.map((item) => {
                return (
                  <li key={item.id}>
                    {item.value}
                    <button
                      className='btn btn-floating'
                      onClick={() => this.deleteItem(item.id)}
                    >
                      <i className='material-icons'>X</i>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>{' '}
        </div>
      </div>
    );
  }
}

export default App;
