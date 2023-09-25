using backend.Models;

namespace backend.Utils
{
    public class CurrencyList
    {
        private static readonly List<Currency> currencies = new()
        {
            new (1, "USD"),
            new (80, "INR"),
            new (1.55f, "AUD"),
            new (1.34f, "CAD"),
            new (7.30f, "CNY"),
            new (0.94f, "EUR"),
            new (0.81f, "GBP")
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

            if (currency1 != null && currency2 != null)
            {
                return currency2.ConverionRate / currency1.ConverionRate;
            }
            throw new KeyNotFoundException();
        }
    }
}
