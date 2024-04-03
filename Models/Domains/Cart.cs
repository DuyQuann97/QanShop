namespace QanShop.Models.Domains
{
    public class Cart
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; } = 1;

        public Guid ProductId { get; set; }

        //navigation Properties
        public Product Product { get; set; }
    }
}
