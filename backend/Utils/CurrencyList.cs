using backend.Models;

namespace backend.Utils
{
    public class CurrencyList
    {
        private static readonly List<Currency> currencies =  new List<Currency> { 
            new Currency(1, "USD"),
            new Currency(80, "INR"),
            new Currency(1.55f, "AUD"),
            new Currency(1.34f, "CAD"),
            new Currency(7.30f, "CNY"),
            new Currency(0.94f, "EUR"),
            new Currency(0.81f, "GBP")
        };

        public static List<string> GetCurrencies()
        {
            return currencies.Select(c => c.Name).ToList();
        }

        public static Currency? CheckCurrency(string currency)
        {
            return currencies.FirstOrDefault(c => c.Name.Equals(currency));
        }

        public static double GetConversionRate(string cur1, string cur2)
        {
            var currency1 = CheckCurrency(cur1);
            var currency2 = CheckCurrency(cur2);

            if (currency1 != null && currency2 != null){
                return currency2.ConverionRate / currency1.ConverionRate;
            }
            throw new KeyNotFoundException();
        }
    }
}
