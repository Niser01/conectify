// taken from:
// https://stackoverflow.com/a/16348977

export default function stringToColour(str: string): string {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 3) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 5)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
      
    }
    return colour;
}