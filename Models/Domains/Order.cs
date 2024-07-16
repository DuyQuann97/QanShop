namespace QanShop.Models.Domains
{
    public class Order
    {
        public Guid Id { get; set; }
        public int Total { get; set; }

        public Guid CartId { get; set; }

        //Navigation Properties
        public Cart? Cart { get; set; }
    }
}
