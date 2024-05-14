namespace QanShop.Models.Domains
{
    public class Category
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public bool IsActived { get; set; } = true;
    }
}
