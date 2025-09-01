function convertTemperature() {
    const input = document.getElementById('temperatureInput').value;
    const unit = document.getElementById('unitSelect').value;
    const resultDiv = document.getElementById('result');

    if (isNaN(input) || input === '') {
        resultDiv.textContent = 'Please enter a valid number';
        return;
    }

    const temp = parseFloat(input);
    let convertedTemp;

    if (unit === 'celsius') {
        convertedTemp = (temp * 9/5) + 32; // to Fahrenheit
        convertedTempKelvin = temp + 273.15; // to Kelvin
        resultDiv.textContent = `Fahrenheit: ${convertedTemp.toFixed(2)}°F, Kelvin: ${convertedTempKelvin.toFixed(2)}°K`;
    } else if (unit === 'fahrenheit') {
        convertedTemp = (temp - 32) * 5/9; // to Celsius
        convertedTempKelvin = (temp - 32) * 5/9 + 273.15; // to Kelvin
        resultDiv.textContent = `Celsius: ${convertedTemp.toFixed(2)}°C, Kelvin: ${convertedTempKelvin.toFixed(2)}°K`;
    } else if (unit === 'kelvin') {
        convertedTemp = temp - 273.15; // to Celsius
        convertedTempFahrenheit = (temp - 273.15) * 9/5 + 32; // to Fahrenheit
        resultDiv.textContent = `Celsius: ${convertedTemp.toFixed(2)}°C, Fahrenheit: ${convertedTempFahrenheit.toFixed(2)}°F`;
    }
}