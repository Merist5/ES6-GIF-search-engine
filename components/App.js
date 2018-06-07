const GIPHY_PUB_KEY = "Q3OGg0B0Dv2kgKmCyUTUEG3wUMLSbRjA";
const GIPHY_API_URL = "https://api.giphy.com";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            loading: false,
            searchingText: '',
            gif: {}
        };
    }

    handleSearch(searchingText) {
        this.setState({loading: true});
        this.getGif(searchingText)
        .then((gif) => {
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                });
            })
            .catch(error => console.log('error'));
    }

    getGif(searchingText) {
        return new Promise (
            function(resolve,reject) {
                var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
                var xhr = new XMLHttpRequest();  
                xhr.open('GET', url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText).data; 
                        var gif = {  
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                    resolve(gif); 
                    } 
                    else {
                        reject(new Error(xhr.statusText)); 
                    } 
                };

                xhr.onerror = function () {
                    reject(new Error(
                     `XMLHttpRequest Error: ${xhr.statusText}`));
                };

                xhr.send();
            }
        );  
    }  

    render() {

        const styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
          </div>
        );
    }
}