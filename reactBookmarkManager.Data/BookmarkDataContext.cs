using Microsoft.EntityFrameworkCore;

namespace reactBookmarkManager.Data;

public class BookmarkDataContext : DbContext
{
    private readonly string _connectionString;

    public BookmarkDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
    public DbSet<Bookmark> Bookmarks { get; set; }
    public DbSet<User> Users { get; set; }
}