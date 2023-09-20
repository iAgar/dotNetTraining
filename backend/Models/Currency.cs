namespace backend.Models
{
    public class Currency
    {
        public Currency(float cRate, string nme) { 
            ConverionRate = cRate;
            Name = nme;
        }
        public float ConverionRate { get;}

        public string Name { get;} = default!;
    }
}
