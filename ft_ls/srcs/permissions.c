/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   permissions.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <chzabakh@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/07/05 13:54:46 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/05 14:33:07 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	ft_time(char **hour)
{
	ft_putstr(hour[0]);
	ft_putchar(':');
	ft_putstr(hour[1]);
}

void	ft_date(time_t mtime)
{
	char	**date;
	char	**hour;
	time_t	now;
	char	*year;

	time(&now);
	date = ft_strsplit(ctime(&mtime), ' ');
	ft_putstr(date[1]);
	ft_putchar(' ');
	ft_putstr(date[2]);
	ft_putchar('\t');
	hour = ft_strsplit(date[3], ':');
	if ((now - mtime) < 2592000)
		ft_time(hour);
	else
	{
		year = ft_strtrim(date[4]);
		ft_putstr(year);
		free(year);
	}
	ft_putstr("\t");
	ft_boardel(date);
	ft_boardel(hour);
}

void	permissions_one(mode_t mode)
{
	if (S_ISBLK(mode))
		ft_putchar('b');
	else if (S_ISCHR(mode))
		ft_putchar('c');
	else if (S_ISDIR(mode))
		ft_putchar('d');
	else if (S_ISLNK(mode))
		ft_putchar('l');
	else if (S_ISSOCK(mode))
		ft_putchar('s');
	else if (S_ISFIFO(mode))
		ft_putchar('p');
	else if (S_ISREG(mode))
		ft_putchar('-');
	if (mode & S_IRUSR)
		ft_putchar('r');
	else
		ft_putchar('-');
	if (mode & S_IWUSR)
		ft_putchar('w');
	else
		ft_putchar('-');
}

void	permissions_two(mode_t mode)
{
	if (!(mode & S_IXUSR) && (mode & S_ISUID))
		ft_putchar('S');
	else if ((mode & S_IXUSR) && (mode & S_ISUID))
		ft_putchar('s');
	else if (mode & S_IXUSR)
		ft_putchar('x');
	else
		ft_putchar('-');
	if (mode & S_IRGRP)
		ft_putchar('r');
	else
		ft_putchar('-');
	if (mode & S_IWGRP)
		ft_putchar('w');
	else
		ft_putchar('-');
	if (!(mode & S_IXGRP) && (mode & S_ISGID))
		ft_putchar('S');
	else if ((mode & S_IXGRP) && (mode & S_ISGID))
		ft_putchar('s');
	else if (mode & S_IXGRP)
		ft_putchar('x');
	else
		ft_putchar('-');
}

void	ft_permissions(mode_t mode)
{
	permissions_one(mode);
	permissions_two(mode);
	if (mode & S_IROTH)
		ft_putchar('r');
	else
		ft_putchar('-');
	if (mode & S_IWOTH)
		ft_putchar('w');
	else
		ft_putchar('-');
	if (!(mode & S_IXOTH) && (mode & S_ISVTX))
		ft_putchar('T');
	else if ((mode & S_IXOTH) && (mode & S_ISVTX))
		ft_putchar('t');
	else if (mode & S_IXOTH)
		ft_putchar('x');
	else
		ft_putchar('-');
}
