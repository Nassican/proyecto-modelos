using System.Net;
using System.Net.Mail;
using api_shifts.Interfaces.IServices;

namespace api_shifts.Services;

public class EmailService : IEmailService
{
    private readonly SmtpClient _smtpClient;

    public EmailService()
    {
        _smtpClient = new SmtpClient
        {
            Host = "smtp.gmail.com",
            Port = 587,
            EnableSsl = true,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential("yorth21@gmail.com", "dpdj tqdp garr ulzn")
        };
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        try
        {
            var addressFrom = new MailAddress("yorth21@gmail.com", "Your Shifts App");
            var addressTo = new MailAddress(to);
            var mailMessage = new MailMessage(addressFrom, addressTo);
            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = false;
            mailMessage.Body = body;
            
            await _smtpClient.SendMailAsync(mailMessage);
        }
        catch (Exception _)
        {
            // ignored
        }
    }
}