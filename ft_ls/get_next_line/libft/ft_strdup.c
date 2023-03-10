/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strdup.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <chzabakh@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/01 13:32:04 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/02 20:15:10 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strdup(const char *s1)
{
	int		i;
	int		lenth;
	char	*duplication;

	i = 0;
	lenth = 0;
	while (s1[i] != '\0')
	{
		i++;
		lenth++;
	}
	duplication = (char *)malloc((sizeof(char) * lenth) + 1);
	if (duplication == NULL)
	{
		return (NULL);
	}
	i = 0;
	while (i < lenth)
	{
		duplication[i] = s1[i];
		i++;
	}
	duplication[i] = '\0';
	return (duplication);
}
