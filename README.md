# MMM-DeLijn

This is a module for the Magic Mirror. It loads live timings for a specific bus stop.

## Installation

Go to [this page](https://data.delijn.be/) and make an account. Then go to [this page](https://data.delijn.be/products/5978abf6e8b4390cc83196ad) and subscribe. You will get an API key, replace it in the DL.js file together with the bus stop you want to load.

Also change the $BUS_STOP variable to your closest busstop or the one you want to monitor. You can lookup the busstop nr by using [this website](https://www.delijn.be/en/haltes/)

Put the MMM-DeLijn module in your modules folder.

add this to your config file:
```
{
    module: "MMM-DeLijn",
	header: "Bus"
}
```