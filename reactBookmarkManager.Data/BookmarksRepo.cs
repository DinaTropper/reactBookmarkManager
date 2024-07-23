using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace reactBookmarkManager.Data
{
    public class BookmarksRepo
    {
        private readonly string _connectionString;
        public BookmarksRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<TopBookmark> GetTopFive()
        {
            var context = new BookmarkDataContext(_connectionString);
            var bookmarks = new List<TopBookmark>();
            foreach (Bookmark b in context.Bookmarks.ToList())
            {
                var top = bookmarks.FirstOrDefault(u => u.Url == b.Url);
                if (top == null)
                {
                    top = new TopBookmark
                    {
                        Id = b.Id,
                        Url = b.Url,
                    };
                    bookmarks.Add(top);
                }
                top.Count++;
            }
           return bookmarks.OrderByDescending(b => b.Count).Take(5).ToList();
 

        }
        public List<Bookmark> GetMine(int userId)
        {
            var context = new BookmarkDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == userId).ToList();
        }
        public void AddBookmark(Bookmark b)
        {
            var context = new BookmarkDataContext(_connectionString);
            context.Bookmarks.Add(b);
            context.SaveChanges();
        }
        public void DeleteBookmark(int id)
        {
            var context = new BookmarkDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {id}");
            context.SaveChanges();
        }
        public void UpdateBookmark(Bookmark b)
        {
            var context = new BookmarkDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title = {b.Title} WHERE Id = {b.Id}");
            context.SaveChanges();
        
        }
        public Bookmark GetById(int id)
        {
            var context = new BookmarkDataContext(_connectionString);
            return context.Bookmarks.FirstOrDefault(b => b.Id == id);
        }       

    }
}
